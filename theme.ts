import {extendTheme} from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      "#__next": {
        padding: 4,
      },
    },
  },
});
