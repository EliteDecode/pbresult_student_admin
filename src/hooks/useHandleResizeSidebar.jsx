import React, { useEffect, useLayoutEffect, useState } from "react";

const useHandleResizeSidebar = () => {
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebar(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    setIsSidebar(window.innerWidth > 767);
  }, []);

  return { isSidebar, setIsSidebar };
};

export default useHandleResizeSidebar;
