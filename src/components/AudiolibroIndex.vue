<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Nombre del Audio</th>
        <th>Link del audio</th>
        <th>Autor</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='audiolibro in audiolibros'>
       <td>{{audiolibro.nombreAudio}}</td>
       <td>{{audiolibro.audio}}</td>
       <td>{{audiolibro.autor}}</td>
       <td>
       <router-link class="button"
         :to="'/audiolibro/show/'+audiolibro._id">Mostrar</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/audiolibro/edit/'+audiolibro._id">Editar</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteAudiolibro(audiolibro._id)">Eliminar</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/audiolibro/create">Nuevo</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Audiolibro Index",
  data() {
    return {
      title: 'Lista de audiolibros',
      audiolibros: []
    };
  },
  mounted() {
    this.allAudiolibros()
  },
  methods: {
    allAudiolibros() {
      fetch(this.url+'/.netlify/functions/audiolibroFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.audiolibros = items;
        })
     },
     deleteAuthor(id) {
       fetch(this.url+'/.netlify/functions/audiolibroDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allAudiolibros();
          }
        )
     }
  }
};
</script>