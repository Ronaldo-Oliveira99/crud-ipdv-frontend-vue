<template>
<div  class="home"> 
  <h2 class="title">Bem vindo Usuário</h2>
    <div>
        
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>

                    <b-tab title="Consultar" >
                       <Consultar />
                    </b-tab>
                    <b-tab title="Funcionario" active>

                        <Cadastrar />
                    </b-tab>

                     <b-tab title="Cargo">
                          <Cargo />
                    </b-tab>

                    <b-tab title="Departamento">
                        <Departamento />
                    </b-tab>

                     <b-tab title="Centro de Custo">
                      <CentroCusto />
                    </b-tab>

                     <b-tab title="Sobre">
                       Sobre
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>

</div>
</template>

<script>
import Cadastrar from '../pages/Cadastro'
import Consultar from '../pages/Consulta'
import Cargo from '../pages/Cargo'
import Departamento from '../pages/Departamento'
import CentroCusto from '../pages/CentroCusto'

export default {
    name: 'Home',
 components: { Cadastrar , Consultar, Cargo, Departamento, CentroCusto}
}   
</script>

<style>
.home{
    width: 70%;
    margin: 0 auto;
}
.title{
    padding: 30px;
}
</style>