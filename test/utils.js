import test from 'ava'
import { g, gv, concatClasses } from '../src/utils/utils'

test('gv', t => {
  // undefined
  t.is(gv("not-exists"), undefined)
  t.is(gv("not.exists"), undefined)

  // default
  t.is(gv("not-exists", "v"), "v")

  g.simter = {}
  t.deepEqual(gv("simter"), {})

  g.simter.k1 = "v1"
  t.is(gv("simter.k1"), "v1")
  t.is(gv("simter.k2"), undefined)
  t.is(gv("simter.k2", "v2"), "v2")
  t.is(gv("simter.k2.a"), undefined)

  g.simter.k1 = { a: "v1a" }
  t.is(gv("simter.k1.a"), "v1a")
})

test('concatClasses', t => {
  t.deepEqual(concatClasses(), [])
  t.deepEqual(concatClasses(undefined), [])
  t.deepEqual(concatClasses(undefined, 1), [1])
  t.deepEqual(concatClasses(1, 2), [1, 2])
  t.deepEqual(concatClasses([1, 2], 3), [1, 2, 3])
})