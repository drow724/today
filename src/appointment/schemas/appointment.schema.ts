import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  name: string;

  @Prop()
  owner: string;

  @Prop()
  date: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
