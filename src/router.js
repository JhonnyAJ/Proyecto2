import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import AudiolibroIndex from "./components/AudiolibroIndex.vue";
import AudiolibrosDetails from "./components/AudiolibroDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/audiolibros", component: AudiolibroIndex },
  { path: "/audiolibros/show/:id", 
    component: AudiolibrosDetails, props: {show:true} },
  { path: "/audiolibros/edit/:id", 
    component: AudiolibrosDetails, props: {edit:true} },
  { path: "/audiolibros/create", 
    component: AudiolibrosDetails, props: {create:true} },
  { path: "/audiolibros/delete/:id", 
    component: AudiolibrosDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;