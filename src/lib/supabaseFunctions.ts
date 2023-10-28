import { ref, onMounted } from 'vue'
import { supabase } from './supabaseClient'

export const countries = ref([])

export async function getCountries() {
  const { data } = await supabase.from('countries').select()
}

export async function insertCountries(){
  const input = document.getElementById('inputvalue_insert') as HTMLInputElement | null;
  if (input != null) {
    
  const result = input.value;
  const { data, error } = await supabase
  .from('countries')
  .insert([
      { name: result },
  ])
      .select()
    if(error){
      console.log(error)
    }
    console.log("Vous avez ajouté: " + result)
  }
  
}

export async function updateCountries(){
  const input = document.getElementById('inputvalue_update') as HTMLInputElement | null;
  const filter_update = document.getElementById('filter_update') as HTMLInputElement | null;
  if(input != null){
    if(filter_update != null){
      const result = input.value
      const filter = filter_update.value
      const { data, error } = await supabase
      .from('countries')
      .update({ name: result })
      .eq('name', filter)
        .select()
      if(error){
        console.log(error)
      }
      console.log("Vous avez modifié: "+ filter + "par: " + result)
    }
  }
}

export async function deleteCountries(){
  const filter_delete = document.getElementById('filter_delete') as HTMLInputElement | null;
  if(filter_delete != null){
    const filter = filter_delete.value
    const { data, error } = await supabase
    .from('countries')
    .delete()
      .eq('name', filter)
    if(error){
      console.log(error)
    }
    console.log("Vous avez supprimé: "+ filter)
  }
}