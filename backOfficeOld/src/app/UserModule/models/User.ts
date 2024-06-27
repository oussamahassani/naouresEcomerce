export interface User {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  genre: 'M' | 'F' | 'Autre'; // Vous pouvez ajuster les valeurs selon vos besoins
  birthday: Date;
}
