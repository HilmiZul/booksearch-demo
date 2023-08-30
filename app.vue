<script setup>
const url =
  "https://gist.githubusercontent.com/nanotaboada/6396437/raw/855dd84436be2c86e192abae2ac605743fc3a127/books.json";
const books = ref([]);
const keyword = ref("");
const loading = ref(true);
const dayjs = useDayjs(0);

onMounted(() => getBooks());

const getBooks = async () => {
  loading.value = true;
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => (books.value = data.books));
  if (response) loading.value = false;
};

const booksFilter = computed(() => {
  return books.value.filter((book) => {
    return (
      book.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      book.subtitle.toLowerCase().includes(keyword.value.toLowerCase()) ||
      book.author.toLowerCase().includes(keyword.value.toLowerCase())
    );
  });
});
</script>

<template>
  <Header />

  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <main>
          <div class="text-muted small mb-3">
            showing {{ booksFilter.length }} of {{ books.length }} item(s).
          </div>
          
          <div class="row">
            <div class="col-lg-4">
              <div class="input-group">
                <span class="input-group-text">🔎</span>
                <input
                  v-model="keyword"
                  class="form-control"
                  type="search"
                  placeholder="search by title / subtitle / author..."
                  autofocus
                />
              </div>
            </div>
          </div>

          <div v-if="loading" class="text-muted text-center my-5">⌛️ Loading...</div>
          <div v-else-if="booksFilter.length < 1" class="text-muted text-center my-5">
            Keyword "<strong>{{ keyword }}</strong>" didn't match 😔 <br> Try another keyword.
          </div>

          <div v-for="(book, i) in booksFilter" :key="i" class="list-group list-group-flush">
            <nuxt-link class="list-group-item py-3" data-bs-toggle="modal" :data-bs-target="`#book${i}`">
              {{ book.title }}
            </nuxt-link>
            <div class="modal fade" :id="`book${i}`" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <strong>{{ book.title }}</strong>
                  </div>
                  <div class="modal-body">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong>Subtitle</strong><br>
                        <span v-if="book.subtitle">{{ book.subtitle }}</span>
                        <span v-else>&#8212;</span>
                      </li>
                      <li class="list-group-item"><strong>Stock</strong><br> 75</li>
                      <li class="list-group-item"><strong>Location</strong><br> Rak Informatika / Blok 4</li>
                      <li class="list-group-item"><strong>Author</strong><br> {{ book.author }}</li>
                      <li class="list-group-item"><strong>Published</strong><br> {{ dayjs(book.published).utc() }}</li>
                      <li class="list-group-item"><strong>Publisher</strong><br> {{ book.publisher }}</li>
                      <li class="list-group-item"><strong>Pages</strong><br> {{ book.pages }}</li>
                      <li class="list-group-item"><strong>ISBN</strong><br> {{ book.isbn }}</li>
                      <li class="list-group-item"><strong>Website</strong><br> <nuxt-link :to="book.website" target="_blank">Go to new tab</nuxt-link></li>
                      <li class="list-group-item"><strong>Description</strong><br> {{ book.description }}</li>
                    </ul>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-danger" data-bs-dismiss="modal">close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>