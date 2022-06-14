import a from './a.js'
import c from './233/c.js'

const b = {
  value: 'b',
  getA: () => a.value + ' from b.js',
  getC: () => c.value + ' from b.js'
}
export default b
