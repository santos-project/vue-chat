<template>
  <v-app>
    <vue-sidebar />

    <template>
      <v-card class="mx-auto" max-width="750" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">OVERLINE</div>
            <v-list-item-title class="text-h5 mb-1">
              Headline 5
            </v-list-item-title>
            <v-list-item-subtitle
              >Greyhound divisely hello coldly
              fonwderfully</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar size="80" color="grey">
            <input type="file" ref="fileInput">
          </v-list-item-avatar>

        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text> Button </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-app>
</template>

<script>
import VueSidebar from "@/components/layouts/VueSidebar.vue";

export default {
  components: { VueSidebar },
};
</script>
