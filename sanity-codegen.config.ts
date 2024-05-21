/* eslint import/no-default-export: 0 */

import {SanityCodegenConfig} from 'sanity-codegen'



const config: SanityCodegenConfig = {
    outputPath: './web/cms/types/codegen.d.ts',
    schemaPath: './studio/schemas/index'
}

export default config
