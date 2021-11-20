<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Nombre del audiolibro</label>
       <input class="u-full-width" type="text"
         v-model="audiolibro.nombreAudio">
      </div>
      <div class="six columns">
       <label for="titleInput">URL del audiolibro</label>
       <input class="u-full-width" type="text"
         v-model="audiolibro.audiolibro">
      </div>
     </div>

    <div class="row">
      <div class="six columns">
       <label for="titleInput">Nombre del libro</label>
       <input class="u-full-width" type="text"
         v-model="audiolibro.nombreLibro">
      </div>
     <div class="six columns">
       <label for="titleInput">Nombre del autor</label>
       <input class="u-full-width" type="text"
         v-model="audiolibro.audiolibro">
     </div>
     </div>

    
     <div class="row">
      <router-link class="button button-primary" 
        to="/">Cancelar</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateAudiolibro(audiolibro._id)">Actualiza</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createAudiolibro()">Crear</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Detalles del audiolibro",
  props: ['create','edit','create'],
  data() {
    return {
      title: "Datos del audiolibro",
      audiolibro: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findAudiolibro(route.params.id);
    else {
      this.audiolibro = {
        '_id': Math.floor(Math.random()*100000000),'nombreAudio':'','audio':''};
    }
  },
  methods: {
    findAudiolibro: function(id) {
      fetch(this.url+'/.netlify/functions/audiolibroFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.audiolibro = items[0];
      })
    },
    updateAudiolibro: function(id) {
      fetch(this.url+'/.netlify/functions/audiolibroUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.audiolibro)})
        .then((data) => {
          this.$router.push('/audiolibro');
        }
      )
    },
    createAudiolibro: function() {
      fetch(this.url+'/.netlify/functions/audiolibroInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.audiolibro)})
        .then((data) => {
           this.$router.push('/audiolibro');
        }
      )
    }
  }
};
</script>