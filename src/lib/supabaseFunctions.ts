import { ref, onMounted } from 'vue'
import { supabase } from './supabaseClient'

export const pathologies = ref([])
export const soins = ref([])

export async function getpathologies() {
  const { data } = await supabase.from('pathologies').select()
}

export async function insertpathologies(){
  const input = document.getElementById('inputvalue_insert') as HTMLInputElement | null;
  if (input != null) {
    
  const result = input.value;
  const { data, error } = await supabase
  .from('pathologies')
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

export async function updatepathologies(){
  const input = document.getElementById('inputvalue_update') as HTMLInputElement | null;
  const filter_update = document.getElementById('filter_update') as HTMLInputElement | null;
  if(input != null){
    if(filter_update != null){
      const result = input.value
      const filter = filter_update.value
      const { data, error } = await supabase
      .from('pathologies')
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

export async function deletepathologies(){
  const filter_delete = document.getElementById('filter_delete') as HTMLInputElement | null;
  if(filter_delete != null){
    const filter = filter_delete.value
    const { data, error } = await supabase
    .from('pathologies')
    .delete()
      .eq('name', filter)
    if(error){
      console.log(error)
    }
    console.log("Vous avez supprimé: "+ filter)
  }
}

export async function insertsoins() {
  const name = document.getElementById('soinsname_insert') as HTMLInputElement | null;
  const desc = document.getElementById('soinsdesc_insert') as HTMLInputElement | null;
  const imageInput = document.getElementById('soinsimage_insert') as HTMLInputElement | null;

  if (name != null && desc && imageInput) {
    const result_name = name.value;
    const result_desc = desc.value;

    // Get the selected image file
    const imageFile = imageInput.files?.[0];

    if (imageFile) {
      // Upload the image to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('soins')
        .upload(`${imageFile.name}`, imageFile);

      if (storageError) {
        console.error(storageError);
        return;
      }

      // Construct the full image URL
      const baseUrl = 'https://qfgcsuwyabuvsliecfib.supabase.co';
      const imageUrl = `${baseUrl}/storage/v1/object/public/soins/${storageData?.path}`;

      // Add image metadata to the 'soins' table
      const { data: insertData, error: insertError } = await supabase
        .from('soins')
        .insert([
          {
            name: result_name,
            desc: result_desc,
            image_url: imageUrl,
          },
        ])
        .select();

      if (insertError) {
        console.error(insertError);
      }
    } else {
      console.error('No image selected');
    }
  }
}


export async function deletesoins(){
  const filter_delete = document.getElementById('soins_delete') as HTMLInputElement | null;
  if(filter_delete != null){
    const filter = filter_delete.value
    const { data, error } = await supabase
    .from('soins')
    .delete()
    .eq('name', filter)
    if(error){
      console.log(error)
    }
    console.log("Vous avez supprimé: "+ filter)
  }
}