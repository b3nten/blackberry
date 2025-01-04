import Alpine from "../assets/alpinejs@3.14.7.js";
import Blackberry from "./blackberry.js";

if(typeof window !== 'undefined') {
  window.Alpine = Alpine;
  window.Blackberry = Blackberry;
  Alpine.plugin(Blackberry());
  Alpine.start();
}

export default Blackberry;
