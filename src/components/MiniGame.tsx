import React, { useRef, useEffect, useState } from "react";

const TILE_SIZE = 32;
const VIEWPORT_WIDTH = 18;
const VIEWPORT_HEIGHT = 10;
const LEVEL_WIDTH = VIEWPORT_WIDTH * 2;
const LEVEL_HEIGHT = 10;
const WORLD_SIZE = VIEWPORT_WIDTH / 2;

const SNOW_START = Math.floor(WORLD_SIZE * 2);
const SNOW_END = Math.floor(WORLD_SIZE * 3);

const WORLD_THEMES = [
  {
    name: "Big Tech Office",
    bg: "#e0e7ef",
    ground: "#C2B280",
  },
  {
    name: "Research Lab",
    bg: "#ecfdfa",
    ground: "#b6f0e5",
  },
  {
    name: "Snow Mountain",
    bg: "#c6e6f7",
    ground: "#f3f7fa",
  },
  {
    name: "Music Studio",
    bg: "#f7f3fa",
    ground: "#d6c5f7",
  }
];

const level: number[][] = Array.from({ length: LEVEL_HEIGHT }, (_, y) =>
  Array.from({ length: LEVEL_WIDTH }, (_, x) =>
    y === LEVEL_HEIGHT - 1 ? 1 : 0
  )
);

function isSolid(x: number, y: number, objects: GameObject[]) {
  if (y < 0 || y >= LEVEL_HEIGHT || x < 0 || x >= LEVEL_WIDTH) return true;
  if (level[y][x] === 1) return true;
  for (const obj of objects) {
    if (obj.isSolid && obj.isSolid(x + 0.01, y + 0.99)) {
      return true;
    }
  }
  return false;
}

type GameObject = {
  type: "desk" | "paper" | "computer" | "cloud" | "mountain" | "piano" | "smartphone" | "headphone";
  x: number;
  y: number;
  width: number;
  height: number;
  isSolid?: (px: number, py: number) => boolean;
  draw: (ctx: CanvasRenderingContext2D, camX: number) => void;
};

function drawBigComputer(ctx: CanvasRenderingContext2D, sx: number, sy: number) {
  ctx.save();
  ctx.fillStyle = "#292929";
  ctx.fillRect(sx, sy, 0.92 * TILE_SIZE, 0.76 * TILE_SIZE);
  ctx.fillStyle = "#bde0fe";
  ctx.fillRect(
    sx + 3,
    sy + 3,
    0.82 * TILE_SIZE - 2.6,
    0.63 * TILE_SIZE - 2.5
  );
  ctx.fillStyle = "#888";
  ctx.fillRect(sx + 0.92 * TILE_SIZE / 2 - 8, sy + 0.76 * TILE_SIZE, 16, 6);
  ctx.fillStyle = "#aaa";
  ctx.fillRect(sx + 0.92 * TILE_SIZE / 2 - 16, sy + 0.76 * TILE_SIZE + 6, 32, 8);
  ctx.restore();
}

function getObjects(): GameObject[] {
  const techDeskY = LEVEL_HEIGHT - 2.1;
  const deskTech: GameObject = {
    type: "desk",
    x: 1,
    y: techDeskY,
    width: 3,
    height: 1.0,
    isSolid: (px, py) =>
      px >= 0.7 && px <= 4.1 && Math.abs(py - (techDeskY + 1.0)) < 0.19,
    draw: (ctx, camX) => {
      const sx = (deskTech.x - camX) * TILE_SIZE;
      const sy = deskTech.y * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = "#a0522d";
      ctx.fillRect(sx, sy, deskTech.width * TILE_SIZE + 22, deskTech.height * TILE_SIZE);
      ctx.fillStyle = "#6c4224";
      ctx.fillRect(sx + 2, sy + deskTech.height * TILE_SIZE, 10, 18);
      ctx.fillRect(sx + deskTech.width * TILE_SIZE +10, sy + deskTech.height * TILE_SIZE, 10, 18);
      ctx.restore();
    }
  };
  const computer: GameObject = {
    type: "computer",
    x: 2,
    y: techDeskY - 0.82,
    width: 0.82,
    height: 0.63,
    draw: (ctx, camX) => {
      drawBigComputer(ctx, (2.2 - camX) * TILE_SIZE, (techDeskY - 0.82) * TILE_SIZE);
    }
  };

  const cloud: GameObject = {
    type: "cloud",
    x: 0.5,
    y: 2.6,
    width: 6.2,
    height: 3.6,
    draw: (ctx, camX) => {
      const baseX = (cloud.x - camX) * TILE_SIZE;
      const baseY = cloud.y * TILE_SIZE;
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(baseX + 60, baseY + 40, 38, 20, 0, 1, Math.PI * 2);
      ctx.ellipse(baseX + 100, baseY + 38, 32, 19, 0, 0, Math.PI * 2);
      ctx.ellipse(baseX + 30, baseY + 54, 21, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(baseX + 85, baseY + 60, 37, 20, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;
      drawBigComputer(ctx, baseX + 60, baseY + 24);
      ctx.restore();
    }
  };

  const labDeskY = LEVEL_HEIGHT - 2.1;
  const deskLab: GameObject = {
    type: "desk",
    x: Math.floor(WORLD_SIZE) + 3,
    y: labDeskY,
    width: 3.5,
    height: 1.0,
    isSolid: (px, py) =>
      px >= Math.floor(WORLD_SIZE) + 3 &&
      px <= Math.floor(WORLD_SIZE) + 6.5 &&
      Math.abs(py - (labDeskY + 1.0)) < 0.19,
    draw: (ctx, camX) => {
      const sx = (deskLab.x - camX) * TILE_SIZE;
      const sy = labDeskY * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = "#e6e6e6";
      ctx.fillRect(sx, sy, deskLab.width * TILE_SIZE, 0.9 * TILE_SIZE);
      ctx.fillStyle = "#aaa";
      ctx.fillRect(sx, sy + 0.9 * TILE_SIZE, deskLab.width * TILE_SIZE, 0.1 * TILE_SIZE);
      ctx.fillStyle = "#888";
      ctx.fillRect(sx + 2, sy + 1.0 * TILE_SIZE, 10, 15);
      ctx.fillRect(sx + deskLab.width * TILE_SIZE - 12, sy + 1.0 * TILE_SIZE, 10, 15);
      ctx.restore();
    }
  };

  const paper: GameObject = {
    type: "paper",
    x: Math.floor(WORLD_SIZE) + 4.3,
    y: labDeskY - 0.8,
    width: 1,
    height: 1.2,
    draw: (ctx, camX) => {
      const sx = (paper.x - camX) * TILE_SIZE;
      const sy = paper.y * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx, sy, paper.width * TILE_SIZE, paper.height * TILE_SIZE);
      ctx.strokeStyle = "#bbb";
      ctx.strokeRect(sx, sy, paper.width * TILE_SIZE, paper.height * TILE_SIZE);
      ctx.strokeStyle = "#9cf";
      for (let i = 1; i < 4; ++i) {
        ctx.beginPath();
        ctx.moveTo(sx + 6, sy + 8 * i);
        ctx.lineTo(sx + paper.width * TILE_SIZE - 6, sy + 8 * i);
        ctx.stroke();
      }
      ctx.restore();
    }
  };

const smartphone: GameObject = {
  type: "smartphone",
  x: Math.floor(WORLD_SIZE) + 4.4,
  y: labDeskY - 4.5,
  width: 0.8,
  height: 1.6,
  draw: (ctx, camX) => {
    const sx = (smartphone.x - camX) * TILE_SIZE;
    const sy = smartphone.y * TILE_SIZE;
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#222";
    ctx.beginPath();
    ctx.roundRect(sx, sy, smartphone.width * TILE_SIZE, smartphone.height * TILE_SIZE, 7);
    ctx.fillStyle = "#e9e9ea";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#0a1a2f";
    ctx.fillRect(sx + 3, sy + 8, smartphone.width * TILE_SIZE - 6, smartphone.height * TILE_SIZE - 18);

    ctx.restore();
  }
};

  const pianoY = LEVEL_HEIGHT - 2.3;
  const piano: GameObject = {
    type: "piano",
    x: Math.floor(WORLD_SIZE * 3) + 5.8,
    y: pianoY,
    width: 3,
    height: 0.8,
    draw: (ctx, camX) => {
      const px = (piano.x - camX) * TILE_SIZE,
        py = piano.y * TILE_SIZE;
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(px, py, piano.width * TILE_SIZE, piano.height * TILE_SIZE);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 3;
      ctx.strokeRect(px, py, piano.width * TILE_SIZE, piano.height * TILE_SIZE);
      for (let i = 0; i < 6; ++i) {
        ctx.fillStyle = "#222";
        ctx.fillRect(px + 10 + i * 14, py + 6, 8, 0.38 * TILE_SIZE);
      }
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; ++i) {
        ctx.beginPath();
        ctx.moveTo(px + i * 0.45 * TILE_SIZE + 5, py);
        ctx.lineTo(px + i * 0.45 * TILE_SIZE + 5, py + piano.height * TILE_SIZE);
        ctx.stroke();
      }
      ctx.restore();
    }
  };

  const headphone: GameObject = {
    type: "headphone",
    x: Math.floor(WORLD_SIZE * 3) + 3.9,
    y: pianoY - 1,
    width: 0.7,
    height: 0.4,
    draw: (ctx, camX) => {
      const hx = (headphone.x - camX) * TILE_SIZE,
        hy = headphone.y * TILE_SIZE;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#4d4d4d";
      ctx.arc(hx + 18, hy + 19, 17, Math.PI * 0.9, Math.PI * 0.1, false);
      ctx.stroke();
      ctx.fillStyle = "#353535";
      ctx.beginPath();
      ctx.ellipse(hx + 5, hy + 28, 10, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(hx + 31, hy + 28, 10, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(hx + 31, hy + 40);
      ctx.bezierCurveTo(hx + 38, hy + 60, hx + 48, hy + 35, hx + 60, hy + 44);
      ctx.stroke();
      ctx.restore();
    }
  };

  const mountainStart = SNOW_START;
  const mountainEnd = SNOW_END;
  const mountainPeakX = (mountainStart + mountainEnd) / 2;
  const mountainPeakY = 3.5;
  const mountainBaseY = 8.5;
  const mountain: GameObject = {
    type: "mountain",
    x: mountainStart,
    y: mountainBaseY,
    width: mountainEnd - mountainStart,
    height: -(mountainBaseY - mountainPeakY),
    isSolid: (px, py) => {
      if (px < mountainStart || px > mountainEnd) return false;
      let surfaceY;
      if (px <= mountainPeakX) {
        const slope = (mountainPeakY - mountainBaseY) / (mountainPeakX - mountainStart);
        surfaceY = mountainBaseY + slope * (px - mountainStart);
      } else {
        const slope = (mountainBaseY - mountainPeakY) / (mountainEnd - mountainPeakX);
        surfaceY = mountainPeakY + slope * (px - mountainPeakX);
      }
      if (py > surfaceY - 0.02 && py < surfaceY + 0.18) return true;
      return false;
    },
    draw: (ctx, camX) => {
      ctx.save();
      ctx.beginPath();
      const px0 = (mountainStart - camX) * TILE_SIZE;
      const py0 = mountainBaseY * TILE_SIZE;
      const pxPeak = (mountainPeakX - camX) * TILE_SIZE;
      const pyPeak = mountainPeakY * TILE_SIZE;
      const px1 = (mountainEnd - camX) * TILE_SIZE;
      const py1 = mountainBaseY * TILE_SIZE;
      ctx.moveTo(px0, py0 + TILE_SIZE * 0.8);
      ctx.lineTo(px0, py0);
      ctx.lineTo(pxPeak, pyPeak);
      ctx.lineTo(px1, py1);
      ctx.lineTo(px1, py1 + TILE_SIZE * 0.8);
      ctx.closePath();
      ctx.fillStyle = "#c7d7e8";
      ctx.fill();
      ctx.restore();
    }
  };

  return [
    deskTech,
    computer,
    cloud,
    deskLab,
    paper,
    smartphone,
    piano,
    headphone,
    mountain
  ];
}

function drawSnowboard(ctx: CanvasRenderingContext2D, x: number, y: number, vertical: boolean) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(vertical ? Math.PI / 2 : 0);
  ctx.fillStyle = "#2E66AF";
  ctx.strokeStyle = "#18386B";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(-7, 5, 24, 6.5, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function getCollisionY(mario: any, objects: GameObject[], tryX: number, tryY: number): number | null {
  for (const obj of objects) {
    if (!obj.isSolid) continue;
    for (let dx = 0; dx < mario.width; dx += 0.15) {
      const px = tryX + dx;
      const py = tryY + mario.height;
      if (obj.isSolid(px, py)) {
        let surfY = obj.y + obj.height;
        if (obj.type === "mountain") {
          const mountainStart = obj.x;
          const mountainEnd = obj.x + obj.width;
          const mountainPeakX = (mountainStart + mountainEnd) / 2;
          const mountainPeakY = 3.5;
          const mountainBaseY = 8.5;
          if (px <= mountainPeakX) {
            const slope = (mountainPeakY - mountainBaseY) / (mountainPeakX - mountainStart);
            surfY = mountainBaseY + slope * (px - mountainStart);
          } else {
            const slope = (mountainBaseY - mountainPeakY) / (mountainEnd - mountainPeakX);
            surfY = mountainPeakY + slope * (px - mountainPeakX);
          }
        }
        return surfY - mario.height;
      }
    }
  }
  return null;
}


function isOnDesk(mario: any, desk: GameObject) {
  return (
    mario.x + mario.width > desk.x + 0.1 &&
    mario.x < desk.x + desk.width + 1
  );
}

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const mario = useRef({
    x: 8,
    y: LEVEL_HEIGHT - 2,
    vx: 0,
    vy: 0,
    width: 0.8,
    height: 0.9,
    onGround: false,
    onMountain: false,
    mountainY: 0,
    mountainSlope: 0,
  });
  const keys = useRef<{ [key: string]: boolean }>({});
  const jumpHeld = useRef(false);
  const objectsRef = useRef<GameObject[]>(getObjects());
  const snowboardState = useRef<"side" | "bottom" | "up" | null>(null);

  // --- snowboard spin state ---
  const snowboardSpin = useRef<{ spinning: boolean; progress: number }>({
    spinning: false,
    progress: 0,
  });

  const [deskOverlay, setDeskOverlay] = useState<"eng" | "res" | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showEngineerExperience, setShowEngineerExperience] = useState(false);
  const [showResearcherExperience, setShowResearcherExperience] = useState(false);
  const [showSnowboarder, setShowSnowboarder] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  function handleDeskButtonClick(which: "eng" | "res") {
    if (which === "eng") {
      sessionStorage.setItem("miniGameHover", "engineer");
    } else {
      sessionStorage.setItem("miniGameHover", "research");
    }
    window.location.href = "/work";
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let lastTime = performance.now();

    const deskTech = objectsRef.current.find(o => o.type === "desk" && o.x < 5)!;
    const deskLab = objectsRef.current.find(o => o.type === "desk" && o.x > 10)!;
    const computerOnDesk = objectsRef.current.find(o => o.type === "computer")!;
    const cloud = objectsRef.current.find(o => o.type === "cloud");

    function getComputerScreen(obj: GameObject, camX: number) {
      // ...unchanged...
      if (obj.type === "computer") {
        const sx = (obj.x - camX) * TILE_SIZE;
        const sy = obj.y * TILE_SIZE;
        return {
          x: sx + obj.width * TILE_SIZE / 2,
          y: sy + obj.height * TILE_SIZE / 2,
        };
      }
      if (obj.type === "cloud") {
        const sx = (obj.x - camX) * TILE_SIZE + 60;
        const sy = obj.y * TILE_SIZE + 24;
        return {
          x: sx + 0.82 * TILE_SIZE / 2,
          y: sy + 0.63 * TILE_SIZE / 2,
        };
      }
      return { x: 0, y: 0 };
    }

    function getWorld(x: number) {
      // ...unchanged...
      const worldIdx = Math.floor(x / WORLD_SIZE);
      return WORLD_THEMES[Math.min(worldIdx, WORLD_THEMES.length - 1)];
    }

    function isOnMountain(mx: number, my: number) {
      const obj = objectsRef.current.find(o => o.type === "mountain");
      if (!obj) return false;
      const mountainStart = obj.x;
      const mountainEnd = obj.x + obj.width;
      return mario.current.x < mountainEnd &&  mario.current.x > mountainStart && mario.current.y < 8.0;
    }

    // --- Helper: is Mario close to mountain peak? ---
    function isNearMountainPeak(): boolean {
      const obj = objectsRef.current.find(o => o.type === "mountain");
      if (!obj) return false;
      const mountainStart = obj.x;
      const mountainEnd = obj.x + obj.width;
      const mountainPeakX = (mountainStart + mountainEnd) / 2;
      const margin = 1.0; // within 1 tile of peak
      const centerX = mario.current.x + mario.current.width / 2;
      return (
        mario.current.onMountain &&
        Math.abs(centerX - mountainPeakX) < margin
      );
    }

    function draw() {
      const camX = Math.max(
        0,
        Math.min(
          mario.current.x + mario.current.width / 2 - VIEWPORT_WIDTH / 2,
          LEVEL_WIDTH - VIEWPORT_WIDTH
        )
      );
      const worldTheme = getWorld(mario.current.x);
      ctx.fillStyle = worldTheme.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < VIEWPORT_HEIGHT; y++) {
        for (let x = 0; x < VIEWPORT_WIDTH + 1; x++) {
          const worldX = Math.floor(camX) + x;
          if (worldX >= LEVEL_WIDTH) continue;
          const tile = level[y][worldX];
          if (tile === 1) {
            ctx.fillStyle = getWorld(worldX).ground;
            ctx.fillRect(
              (x - (camX % 1)) * TILE_SIZE,
              y * TILE_SIZE,
              TILE_SIZE,
              TILE_SIZE
            );
          }
        }
      }

      for (const obj of objectsRef.current) {
        if (obj.type === "cloud"  && !isOnDesk(mario.current, deskTech)) continue;
        if (obj.type === "smartphone" && !isOnDesk(mario.current, deskLab)) continue;
        obj.draw(ctx, camX);
      }

      // Draw snowboard: spinning if needed, otherwise as usual
      const mx = mario.current.x;
      const my = mario.current.y;
      const sx = (mx - camX) * TILE_SIZE;
      const sy = my * TILE_SIZE;

      // --- Spinning snowboard effect ---
      if (snowboardSpin.current.spinning) {
        // Spinning: use scaleX for y-axis rotation
        const angle = snowboardSpin.current.progress * 4 * Math.PI; // 0 to 2π
        const xScale = Math.cos(angle);
        ctx.save();
        ctx.translate(
          sx + mario.current.width * TILE_SIZE / 2,
          sy + mario.current.height * TILE_SIZE + 2
        );
        ctx.scale(xScale, 1); // fake y-rotation!
        drawSnowboard(ctx, 0, 0, false); // centered
        ctx.restore();
      } else if (mario.current.onMountain && snowboardState.current) {
        // Old logic, only if not spinning
        if (snowboardState.current === "side") {
          drawSnowboard(ctx, sx - 6, sy + mario.current.height * TILE_SIZE / 2, true);
        } else if (snowboardState.current === "bottom") {
          drawSnowboard(ctx, sx + mario.current.width * TILE_SIZE / 2, sy + mario.current.height * TILE_SIZE - 2, false);
        } else if (snowboardState.current === "up") {
          drawSnowboard(ctx, sx + mario.current.width * TILE_SIZE / 2, sy + mario.current.height * TILE_SIZE - 2, false);
        }
      }

      // --- Draw streaming lines if Mario is on office desk ---
      if (isOnDesk(mario.current, deskTech) && cloud) {
        // ...unchanged...
        const deskPos = getComputerScreen(computerOnDesk, camX);
        const cloudPos = getComputerScreen(cloud, camX);
        ctx.save();
        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 8]);
        const dashAnimSpeed = 60;
        const now = performance.now();
        const dashOffset = (now / dashAnimSpeed) % 18;
        ctx.save();
        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = -dashOffset;
        ctx.beginPath();
        ctx.moveTo(deskPos.x + 5, deskPos.y - 10);
        ctx.lineTo(cloudPos.x, cloudPos.y + 30);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = -dashOffset;
        ctx.beginPath();
        ctx.moveTo(cloudPos.x + 10, cloudPos.y + 30);
        ctx.lineTo(deskPos.x + 15, deskPos.y - 10);
        ctx.stroke();
        ctx.restore();
        setShowEngineerExperience(true);
        ctx.restore();
      } else {
        setShowEngineerExperience(false);
      }

      // Draw red dot if needed
      if (isOnDesk(mario.current, deskLab)) {
        // ...unchanged...
        const smartphone = objectsRef.current.find(o => o.type === "smartphone")!;
        const sx = (smartphone.x - camX) * TILE_SIZE;
        const sy = smartphone.y * TILE_SIZE;
        const t = performance.now();
        const shake = Math.sin(t * 0.01);
        ctx.fillStyle = "#bbb";
        ctx.fillRect(sx + smartphone.width * TILE_SIZE / 2 - 8, sy + smartphone.height * TILE_SIZE - 40, 16, 4);
        ctx.beginPath();
        ctx.arc(
          sx + smartphone.width * TILE_SIZE - 6,
          sy + 12 + shake,
          8,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#e63946";
        ctx.fill();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("1", sx + smartphone.width * TILE_SIZE - 6, sy + 16 + shake);
        setShowResearcherExperience(true);
      } else {
        setShowResearcherExperience(false);
      }

      // Music
      if (worldTheme.name == "Music Studio") {
        setShowMusic(true);
      } else {
        setShowMusic(false);
      }
      
      // Draw Mario (grey, unchanged)
      const marioScreenX = (mario.current.x - camX) * TILE_SIZE - 20;
      const marioScreenY = mario.current.y * TILE_SIZE - 20;
      const w = mario.current.width * TILE_SIZE * 2;
      const h = mario.current.height * TILE_SIZE * 2;

if (snowboardSpin.current.spinning) {
  const angle = snowboardSpin.current.progress * 4 * Math.PI; // or 2 * Math.PI for exactly 360°
  const xScale = Math.cos(angle);

  // Center for spin: use Mario's center
  ctx.save();
  ctx.translate(
    marioScreenX + w / 2,
    marioScreenY + h / 2
  );
  ctx.scale(xScale, 1);

  // Now draw Mario centered at (0, 0)
  // (Head/body/arms/legs, but their positions must be relative to (-w/2, -h/2))
  ctx.fillStyle = "#888";
  ctx.fillRect(-w/2 + w * 0.23, -h/2 + h * 0.43, w * 0.54, h * 0.37);

  ctx.fillStyle = "#bbb";
  ctx.fillRect(-w/2 + w * 0.28, -h/2 + h * 0.13, w * 0.44, h * 0.3);

  ctx.fillStyle = "#666";
  ctx.fillRect(-w/2 + w * 0.28, -h/2 + h * 0.80, w * 0.13, h * 0.18);

  ctx.fillStyle = "#666";
  ctx.fillRect(-w/2 + w * 0.59, -h/2 + h * 0.80, w * 0.13, h * 0.18);

  ctx.fillStyle = "#aaa";
  ctx.fillRect(-w/2 + w * 0.13, -h/2 + h * 0.48, w * 0.13, h * 0.18);

  ctx.fillStyle = "#aaa";
  ctx.fillRect(-w/2 + w * 0.74, -h/2 + h * 0.48, w * 0.13, h * 0.18);

  ctx.restore();
} else {
  // Normal Mario drawing
  ctx.fillStyle = "#888";
  ctx.fillRect(marioScreenX + w * 0.23, marioScreenY + h * 0.43, w * 0.54, h * 0.37);

  ctx.fillStyle = "#bbb";
  ctx.fillRect(marioScreenX + w * 0.28, marioScreenY + h * 0.13, w * 0.44, h * 0.3);

  ctx.fillStyle = "#666";
  ctx.fillRect(marioScreenX + w * 0.28, marioScreenY + h * 0.80, w * 0.13, h * 0.18);

  ctx.fillStyle = "#666";
  ctx.fillRect(marioScreenX + w * 0.59, marioScreenY + h * 0.80, w * 0.13, h * 0.18);

  ctx.fillStyle = "#aaa";
  ctx.fillRect(marioScreenX + w * 0.13, marioScreenY + h * 0.48, w * 0.13, h * 0.18);

  ctx.fillStyle = "#aaa";
  ctx.fillRect(marioScreenX + w * 0.74, marioScreenY + h * 0.48, w * 0.13, h * 0.18);
}
    }

    function update(dt: number) {
      const centerX = mario.current.x + mario.current.width / 2;
      const onMountain = isOnMountain(centerX, mario.current.y);

      if (onMountain) {
        mario.current.onMountain = true;
        let left = keys.current["a"] || keys.current["A"];
        let right = keys.current["d"] || keys.current["D"];
        let up = keys.current["w"] || keys.current["W"];

        const isLeftOfPeak = centerX <= (SNOW_START + SNOW_END) / 2;

        if (left && !right) {
          if (isLeftOfPeak) {
            snowboardState.current = "bottom";
          } else {
            snowboardState.current = "side";
          }
        } else if (right && !left) {
          if (!isLeftOfPeak) {
            snowboardState.current = "bottom";
          } else {
            snowboardState.current = "side";
          }
        } else if (up) {
          snowboardState.current = "up";
        } else {
          snowboardState.current = "bottom";
        }
        setShowSnowboarder(true);
      } else {
        mario.current.onMountain = false;
        snowboardState.current = null;
        setShowSnowboarder(false);
      }

      if (keys.current["a"] || keys.current["A"]) mario.current.vx = -0.12;
      else if (keys.current["d"] || keys.current["D"]) mario.current.vx = 0.12;
      else mario.current.vx = 0;

      const wPressed = keys.current["w"] || keys.current["W"];

      // --- SPIN LOGIC: start if jumping near mountain peak ---
      if (
        wPressed &&
        mario.current.onGround &&
        !jumpHeld.current &&
        isNearMountainPeak()
      ) {
        mario.current.vy = -0.32;
        mario.current.onGround = false;
        jumpHeld.current = true;
        // Start spin
        snowboardSpin.current.spinning = true;
        snowboardSpin.current.progress = 0;
      } else if (wPressed && mario.current.onGround && !jumpHeld.current) {
        mario.current.vy = -0.32;
        mario.current.onGround = false;
        jumpHeld.current = true;
      }
      if (!wPressed) jumpHeld.current = false;

      mario.current.vy += 0.018;

      let tryX = mario.current.x + mario.current.vx;
      let tryY = mario.current.y;

      if (
        !isSolid(Math.floor(tryX), Math.floor(mario.current.y), objectsRef.current) &&
        !isSolid(Math.floor(tryX + mario.current.width - 0.01), Math.floor(mario.current.y), objectsRef.current)
      ) {
        mario.current.x = Math.max(0, Math.min(LEVEL_WIDTH - mario.current.width, tryX));
      }

      tryY = mario.current.y + mario.current.vy;

      if (mario.current.vy > 0) {
        let groundCollision = false;
        if (
          isSolid(Math.floor(mario.current.x), Math.floor(tryY + mario.current.height), objectsRef.current) ||
          isSolid(Math.floor(mario.current.x + mario.current.width - 0.01), Math.floor(tryY + mario.current.height), objectsRef.current)
        ) {
          groundCollision = true;
        }
        const objY = getCollisionY(mario.current, objectsRef.current, mario.current.x, tryY);
        if (objY !== null) {
          mario.current.y = objY;
          mario.current.vy = 0;
          mario.current.onGround = true;
        } else if (groundCollision) {
          mario.current.onGround = true;
          mario.current.vy = 0;
          mario.current.y = Math.floor(tryY + mario.current.height) - mario.current.height;
        } else {
          mario.current.y = tryY;
          mario.current.onGround = false;
        }
      } else {
        if (
          isSolid(Math.floor(mario.current.x), Math.floor(tryY), objectsRef.current) ||
          isSolid(Math.floor(mario.current.x + mario.current.width - 0.01), Math.floor(tryY), objectsRef.current)
        ) {
          mario.current.vy = 0;
        } else {
          mario.current.y = tryY;
        }
      }

      mario.current.y = Math.min(mario.current.y, LEVEL_HEIGHT - mario.current.height);

      // --- Advance the spin if spinning ---
      if (snowboardSpin.current.spinning) {
        if (!mario.current.onGround) {
          snowboardSpin.current.progress += dt / 500; // spin duration (ms), adjust as needed
          if (snowboardSpin.current.progress > 1) {
            snowboardSpin.current.progress = 1;
          }
        } else {
          snowboardSpin.current.spinning = false;
          snowboardSpin.current.progress = 0;
        }
      }
    }

    function loop(now: number) {
      const dt = now - lastTime;
      lastTime = now;
      update(dt);
      draw();
      requestRef.current = requestAnimationFrame(loop);
    }

    requestRef.current = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      keys.current[e.key] = true;
      if (
        showInstructions &&
        (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" ||
          e.key === "W" || e.key === "A" || e.key === "S" || e.key === "D")
      ) {
        setShowInstructions(false);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      keys.current[e.key] = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [showInstructions]);

  // ...all overlay/UI code unchanged...
  // (no changes needed below this line)
  const canvasWidth = TILE_SIZE * VIEWPORT_WIDTH;
  const overlayBaseStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: 30,
    transform: "translateX(-50%)",
    background: "transparent",
    color: "#1e2b39",
    fontWeight: 600,
    border: "none",
    borderRadius: 0,
    padding: 0,
    fontSize: "1.35rem",
    zIndex: 30,
    boxShadow: "none",
    pointerEvents: "auto",
    minWidth: 0,
    textAlign: "center",
    cursor: "pointer",
    transition: "color 0.15s",
    lineHeight: 1.6,
  };

  const instructionStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: 50,
    transform: "translateX(-50%)",
    color: "#A9A9A9",
    fontWeight: 100,
    fontSize: "0.7rem",
    pointerEvents: "none",
    userSelect: "none",
    textAlign: "center"
  };

  return (
    <div className="flex flex-col items-center my-6" style={{ position: "relative", width: canvasWidth }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={TILE_SIZE * VIEWPORT_HEIGHT}
        style={{
          border: "2px solid #444",
          background: "#b3e0ff",
          imageRendering: "pixelated",
          margin: "auto"
        }}
        tabIndex={0}
      />
      {showInstructions && (
        <div style={instructionStyle}>
          Move or jump using "WASD" to explore!
        </div>
      )}
      {showEngineerExperience && (
        <div style={instructionStyle}>
          <div>
          💻 AWS Software Engineer 💻
          </div>
          <div>
          Developed EUC AI-powered Observability Solution
          </div>
        </div>
      )}
      {showResearcherExperience && (
        <div style={instructionStyle}>
          <div>
          📋 HCI Researcher 📋
          </div>
          <div>
          Interested in Context-Aware Intelligent Systems
          </div>
        </div>
      )}
      {showSnowboarder && (
        <div style={instructionStyle}>
          <div>
          🏂 Snowboard Lover 🏂
          </div>
          <div>
            Meet me at the top of the snow mountain!
          </div>
        </div>
      )}
      {showMusic && (
        <div style={instructionStyle}>
          <div>
          🎵 Song Writer & Producer 🎵
          </div>
          <div>
            My first song coming soon!
          </div>
        </div>
      )}
      {deskOverlay === "eng" && (
        <button
          style={{
            ...overlayBaseStyle,
            color: "#1e2b39",
          }}
          onClick={() => handleDeskButtonClick("eng")}
          onMouseOver={e => (e.currentTarget.style.color = "#1857c1")}
          onMouseOut={e => (e.currentTarget.style.color = "#1e2b39")}
        >
          <span role="img" aria-label="computer" style={{ marginRight: 8 }}>💻</span>
          Engineer
        </button>
      )}
      {deskOverlay === "res" && (
        <button
          style={{
            ...overlayBaseStyle,
            color: "#1c5636"
          }}
          onClick={() => handleDeskButtonClick("res")}
          onMouseOver={e => (e.currentTarget.style.color = "#2bb382")}
          onMouseOut={e => (e.currentTarget.style.color = "#1c5636")}
        >
          <span role="img" aria-label="scholar" style={{ marginRight: 8 }}>🎓</span>
          Researcher
        </button>
      )}
    </div>
  );
}