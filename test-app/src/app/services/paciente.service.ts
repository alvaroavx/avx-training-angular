import { Injectable }   from '@angular/core';
import { EstadoPaciente, PacienteModel } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private _pacientes: PacienteModel[] = [
    new PacienteModel(1, "Ana", "Pérez", new Date(1985, 4, 20),    "Hipertensión",     "ana.perez@example.com",    "+56912345678", "A101", new Date(2025, 8, 15), ["Atenolol"], EstadoPaciente.Estable),
    new PacienteModel(2, "Carlos", "Ruiz", new Date(1992, 11, 1),   "Diabetes",         "carlos.ruiz@example.com",  "+56923456789", "B202", new Date(2025, 8, 20), ["Metformina","Insulina"], EstadoPaciente.Grave),
    new PacienteModel(3, "María", "González", new Date(1978, 1, 10),"Asma",             "maria.gonzalez@example.com","+56934567890", "C303", new Date(2025, 8, 18), ["Salbutamol"], EstadoPaciente.ListoParaAlta),
    new PacienteModel(4, "José", "Martínez", new Date(1980, 6, 5),  "COVID-19",         "jose.martinez@example.com", "+56945678901", "D404", new Date(2025, 8, 22), ["Paracetamol","Dexametasona"], EstadoPaciente.Regular),
    new PacienteModel(5, "Luisa", "Fernández", new Date(1965, 9, 25),"Artritis",       "luisa.fernandez@example.com","+56956789012", "E505", new Date(2025, 8, 30), ["Ibuprofeno"], EstadoPaciente.Critico),
    new PacienteModel(6, "Pablo", "Soto", new Date(1995, 2, 14),    "Migraña",          "pablo.soto@example.com",   "+56967890123", "F606", new Date(2025, 9, 1),  ["Sumatriptán"], EstadoPaciente.Grave),
    new PacienteModel(7, "Daniela", "Rojas", new Date(2000, 10, 3),"Gripe",            "daniela.rojas@example.com", "+56978901234", "G707", new Date(2025, 8, 25), ["Paracetamol"], EstadoPaciente.Estable),
    new PacienteModel(8, "Andrés", "Morales", new Date(1988, 7, 12),"Anemia",          "andres.morales@example.com","+56989012345", "H808", new Date(2025, 9, 5),  ["Sulfato ferroso"], EstadoPaciente.Grave),
    new PacienteModel(9, "Claudia", "Herrera", new Date(1970, 3, 30),"Osteoporosis",   "claudia.herrera@example.com","+56990123456", "I909", new Date(2025, 9, 8),  ["Calcio","Vitamina D"], EstadoPaciente.ListoParaAlta),
    new PacienteModel(10, "Ricardo", "Díaz", new Date(1983, 5, 18), "Bronquitis",       "ricardo.diaz@example.com",  "+56901234567", "J101", new Date(2025, 9, 12), ["Amoxicilina"], EstadoPaciente.Critico),
    new PacienteModel(11, "Sofía", "Castillo", new Date(1998, 11, 22),"Alergia",       "sofia.castillo@example.com", "+56912345098","K202", new Date(2025, 8, 28), ["Loratadina"], EstadoPaciente.Grave),
    new PacienteModel(12, "Marcos", "Torres", new Date(1975, 2, 2), "Hipotiroidismo",   "marcos.torres@example.com", "+56923450123","L303", new Date(2025, 9, 15), ["Levotiroxina"], EstadoPaciente.Regular),
    new PacienteModel(13, "Valentina", "Silva", new Date(1990, 8, 9),"Depresión",      "valentina.silva@example.com","+56934501234","M404", new Date(2025, 9, 20), ["Fluoxetina"], EstadoPaciente.Critico),
    new PacienteModel(14, "Miguel", "López", new Date(1982, 0, 27), "Colesterol",      "miguel.lopez@example.com",  "+56945012345","N505", new Date(2025, 8, 27), ["Atorvastatina"], EstadoPaciente.ListoParaAlta),
    new PacienteModel(15, "Patricia", "Vega", new Date(1979, 6, 14), "Gastritis",       "patricia.vega@example.com", "+56950123456","O606", new Date(2025, 9, 2),  ["Omeprazol"], EstadoPaciente.Critico)
  ];

  getPacientes(): PacienteModel[] {
    return this._pacientes;
  }
}