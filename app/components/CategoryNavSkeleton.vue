<template>
  <div class="animate-pulse space-y-4">
    <div class="flex min-w-max gap-3 overflow-x-auto pb-1">
      <div v-for="n in 8" :key="n" class="flex w-28 flex-col items-center gap-2 rounded-2xl border border-transparent bg-white/70 px-2 py-3">
        <div class="h-10 w-10 rounded-full bg-slate-200" />
        <div class="h-3 w-16 rounded bg-slate-200" />
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      <div v-for="n in 6" :key="`sub-${n}`" class="h-8 w-24 rounded-full bg-slate-100" />
    </div>
  </div>
</template>
