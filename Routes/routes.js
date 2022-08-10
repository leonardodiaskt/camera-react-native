import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeApp from "../src/HomeApp";
import ScreenCam from "../src/ScreenCam";

const Rotas = {
    HomeApp:{
        name: "HomeApp",
        screen: HomeApp,
    },
    ScreenCam: {
        name: "ScreenCam",
        screen: ScreenCam,
    },
};

const Navegacao = createSwitchNavigator(Rotas);
export default createAppContainer(Navegacao);
