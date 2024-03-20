<template>
  <div>
    <label :for="id">
      <slot></slot>
    </label>
    <input style="display: none" @change="$emit('upload', $event.target.files[0])" type="file" multiple :id="id"
    :accept="accept">
  </div>
</template>
<script>
  export default {
    name: 'AddFile',
    props: {
      id: {
        required: true
      },
      accept: {
        type: String
      },
      multiple: {
        type: Boolean,
        default: false
      },
    },
  }
</script>
