// types/express/index.d.ts

import type { AdminDocument } from '../../models/Admin';

declare global {
  namespace Express {
    interface User extends AdminDocument {} // Extend Passport's User type with AdminDocument
  }
}


