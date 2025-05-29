import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full flex pt-10 justify-center min-h-screen">
      <div className="max-w-4xl w-full px-4 mt-0">
        <p className="mb-4 text-muted text-lg">
          Beyond work, I have a deep appreciation for the outdoors and the arts!
        </p>
        <p className="mb-4 text-muted text-lg">
          🏂 I’m an avid snowboarder who enjoys carving through powder during the winter months.
        </p>
        <p className="mb-4 text-muted text-lg">
          🎵 In my free time, I write and produce music, blending creativity with emotion through sound.
        </p>
        <p className="mb-4 text-muted text-lg">
          📸 I also love photography. Here's a glimpse of my recent work:
        </p>
        <div className="mb-4 w-full">
          {/* Elfsight Instagram Feed - naturally stacked */}
          <div
            className="elfsight-app-ef64b6fb-3d12-40df-9b2a-a9b00f8011b4"
            data-elfsight-app-lazy
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;


        <div className="mb-4 w-full">
          {/* Elfsight Instagram Feed - naturally stacked */}
          <div
            className="elfsight-app-ef64b6fb-3d12-40df-9b2a-a9b00f8011b4"
            data-elfsight-app-lazy
            style={{ width: "100%" }}
          ></div>
        </div>