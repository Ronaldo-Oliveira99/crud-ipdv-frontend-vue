<template>
  <div class="user-consulta">
     <h5>Consulta</h5>
      <b-form>
        <b-row>
              <b-col md="6" sm="12">
                <div>
                    <label for="">Seleção Cargos por Dpto</label>
                    <b-form-select v-model="selected" :options="dptoName" v-on:change="getSelectedItem(selected)"  size="sm" class="mt-3"></b-form-select>
                </div>      
            </b-col> 
        </b-row>
                   
        </b-form>
        <hr>
        <b-table hover striped :items="dpto" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl } from '../global'
import axios from 'axios'

export default {
    name: 'consulta',
    data: function() {
       return{
         mode: 'save',
         id:null,
         dpto: [],
         dptoName: [],
         dptoId: [],
          fields: [
              { key: 'id', label: 'funcionario' },
              { key: 'cargo', label: 'departamento' },
              { key: 'dept', label: 'departamento' },
          ]
       }
      },
    methods: {
      getSelectedItem(cargo){
        let arr = []
        this.dptoId.filter(i => i.name === cargo && arr.push(i.id) )
         this.id = arr.pop()
         this.loadDpto()

          },
      loadDpto() {
        const url = `${baseApiUrl}/cargo/${this.id}`
        axios.get(url).then(res => {
          const dpto2 = res.data.map(i => 
          {
            return {id: i.id ,cargo:i.cargo, dept: i.departamento, }
          })
          this.dpto = dpto2
        })
      },

       loadDptoName() {
        const url = `${baseApiUrl}/departamento`
        axios.get(url).then(res => {
          const dpto2 = res.data.map(i => i.name)
          this.dptoName = dpto2
          const dpto3 = res.data.map(i => {
             return {id: i.id, name:i.name}
            })
          this.dptoId = dpto3
        })
      }
    },  
    mounted(){
      this.loadDpto(),
      this.loadDptoName(),
       this.getSelectedItem()

    }
}
</script>

<style>

</style>

 