import Alpine from "../assets/alpinejs@3.14.7.js";
import Blackberry from "./blackberry.js";
export default Blackberry;
window.Alpine = Alpine;
window.Blackberry = Blackberry;
Alpine.plugin(Blackberry());
Alpine.start();
