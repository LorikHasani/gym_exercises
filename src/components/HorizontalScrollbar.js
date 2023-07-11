import React from "react";
import { Box } from "@mui/material";

import BodyPart from "./BodyPart";

function HorizontalScrollbar({ data, bodyPart, setBodyPart }) {
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </Box>
      ))}
    </div>
  );
}

export default HorizontalScrollbar;
