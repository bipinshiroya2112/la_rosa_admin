import React, { useCallback } from "react";
import ColorPicker from "@vtaits/react-color-picker";
export function ColourPicker({ setColor, color }) {
  const onDrag = useCallback((nextColor) => {
    setColor(nextColor);
  }, []);

  return (
    <div>
      <ColorPicker value={color} onDrag={onDrag} />

      <div
        style={{
          background: color,
          width: 50,
          height: 50,
          color: "white",
        }}
      ></div>
    </div>
  );
}
