<template>
  <div class="info">
    <div v-if="card.tags.length" class="tags-wrapper">
      <div class="title">etiquetas</div>
        <c-tag
          v-for="tag in card.tags"
          :key="tag.type"
          :tag="tag"
          :size="6"
        />
    </div>

    <!-- description -->
    <card-section
      icon="id-card"
      title="Descrição"
      :marginBottom="25"
      :marginTop="card.tags.length ? 25 : 0"
    />
    <c-input
      class="input-description"
      v-model="card.description"
      placeholder="Adicione uma descrição mais detalhada..."
    />

    <!-- activity -->
    <card-section
      icon="id-card"
      title="Atividade"
      button="Ocultar detalhes"
      :marginTop="25"
      :marginBottom="25"
    />

    <!-- comments -->
    <card-activity :card="card" />
  </div>
</template>

<script>
export default {
  name: 'info',

  components: {
    CTag: () => import('../Base/CTag'),
    CInput: () => import('../Base/CInput'),
    CardSection: () => import('../Core/CardSection'),
    CardActivity: () => import('../Core/CardActivity')
  },

  props: {
    card: Object
  }
}
</script>

<style lang="scss">
.info {
  & > .tags-wrapper {
    margin-left: 30px;

    & > .title {
      display: block;
      font-size: 12px;
      color: #5e6c84;
      font-weight: 500;
      line-height: 16px;
      line-height: 20px;
      margin-bottom: 10px;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
  }

  & > .input-description {
    margin-left: 30px;
    box-sizing: border-box;
    width: calc(100% - 30px);
  }
}
</style>
