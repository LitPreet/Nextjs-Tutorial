import { z } from 'zod'

// const schema = z.object({
//     name: z.string().min(2),
// })
const schema = z.object({
    name:z.string().min(2),
   email:z.string().email()
})
export default schema
// const arrayOfItemsSchema = z.array(schema);
// export default arrayOfItemsSchema