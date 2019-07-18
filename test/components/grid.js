import test from 'ava'
import Vue from 'vue'
import Grid from '../src/grid.vue'

function createGridInstance(data) {
  const Constructor = Vue.extend(Grid)
  const vm = new Constructor({ propsData: data }).$mount()
  return vm
}

test('simplest grid', t => {
  // define grid data
  const columns = [
    { id: "sn", label: "No." },
    { id: "name" }
  ]
  const rows = [
    { sn: 1, name: "Name 1" },
    { sn: 2, name: "Name 2" }
  ]

  // create grid instance
  const vm = createGridInstance({ columns, rows })

  // verify main container
  t.is(vm.$el.tagName, "DIV")
  const children = vm.$el.children
  t.true(children.length > 1) // at least has headerEl and contentEl
  t.is(vm.$el.getAttribute("class"), "st-grid")

  // verify headerEl
  const headerEl = children[0]
  t.is(headerEl.tagName, "DIV")
  t.is(headerEl.getAttribute("class"), "header")

  // verify contentEl
  const contentEl = children[1]
  t.is(contentEl.tagName, "DIV")
  t.is(contentEl.getAttribute("class"), "content")
})