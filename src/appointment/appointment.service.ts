import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
} from 'src/appointment/schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentModel.findById(id);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const existingAppointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      updateAppointmentDto,
      { new: true },
    );
    if (!existingAppointment) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return existingAppointment;
  }

  async remove(id: number): Promise<Appointment> {
    const deletedAppointment = await this.appointmentModel.findByIdAndDelete(
      id,
    );
    if (!deletedAppointment) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return deletedAppointment;
  }
}
