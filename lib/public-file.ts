import { existsSync } from 'node:fs'
import path from 'node:path'

export function publicFileExists(src?: string): src is string {
  return !!src && existsSync(path.join(process.cwd(), 'public', src))
}
