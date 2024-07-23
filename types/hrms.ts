// Region type
interface Region {
  id: number;
  name: string;
  townships: Township[];
}

// Township type
interface Township {
  id: number;
  name: string;
  regionId: number;
  region: Region; // Define relationship
  villages: Village[];
}

// Village type
interface Village {
  id: number;
  name: string;
  townshipId: number;
  township: Township; // Define relationship
}

// Department type
interface Department {
  id: number;
  name: string;
  positions: Position[];
}

// Position type
interface Position {
  id: number;
  name: string;
  departmentId?: number | null; // Nullable foreign key
  department?: Department; // Define optional relationship
}

// Employee type
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  regionId: number;
  townshipId: number;
  villageId: number;
  departmentId?: number | null; // Nullable foreign key
  positionId?: number | null; // Nullable foreign key
  joinDate: Date;
  resignDate?: Date | null;
  status: EmployeeStatus;
  region: Region; // Define relationship
  township: Township; // Define relationship
  village: Village; // Define relationship
  department?: Department | null; // Define optional relationship
  position?: Position | null; // Define optional relationship
}

// Enum for Employee status
enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  RESIGNED = 'RESIGNED',
}
// Project type
interface Project {
  id: number;
  name: string;
  description?: string | null;
  employees: Employee[]; // Define relationship
}
