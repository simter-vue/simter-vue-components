import test from 'ava'
import { g, get, concatClasses } from '../src/utils/utils'

test('get', t => {
  // undefined
  t.is(get("not-exists"), undefined)
  t.is(get("not.exists"), undefined)

  // default
  t.is(get("not-exists", "v"), "v")

  g.simter = {}
  t.deepEqual(get("simter"), {})

  g.simter.k1 = "v1"
  t.is(get("simter.k1"), "v1")
  t.is(get("simter.k2"), undefined)
  t.is(get("simter.k2", "v2"), "v2")
  t.is(get("simter.k2.a"), undefined)

  g.simter.k1 = { a: "v1a" }
  t.is(get("simter.k1.a"), "v1a")
})

test('concatClasses', t => {
  t.deepEqual(concatClasses(), [])
  t.deepEqual(concatClasses(undefined), [])
  t.deepEqual(concatClasses(undefined, 1), [1])
  t.deepEqual(concatClasses(1, 2), [1, 2])
  t.deepEqual(concatClasses([1, 2], 3), [1, 2, 3])
})