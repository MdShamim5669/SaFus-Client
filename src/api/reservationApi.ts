import { AxiosInstance } from 'axios';
import { ReservationSchemaType } from '../schemas/reservationSchema';

export interface Reservation extends ReservationSchemaType {
  _id: string;
  userEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export const fetchUserReservations = async (axiosSecure: AxiosInstance, email: string): Promise<Reservation[]> => {
  const response = await axiosSecure.get<Reservation[]>(`/reservations?email=${email}`);
  return response.data;
};

export const fetchAllReservations = async (axiosSecure: AxiosInstance): Promise<Reservation[]> => {
  const response = await axiosSecure.get<Reservation[]>('/reservations/all');
  return response.data;
};

export const createReservation = async (axiosSecure: AxiosInstance, data: ReservationSchemaType & { userEmail: string }): Promise<Reservation> => {
  const response = await axiosSecure.post<Reservation>('/reservations', data);
  return response.data;
};

export const updateReservationStatus = async (axiosSecure: AxiosInstance, id: string, status: Reservation['status']): Promise<Reservation> => {
  const response = await axiosSecure.patch<Reservation>(`/reservations/${id}`, { status });
  return response.data;
};

export const deleteReservation = async (axiosSecure: AxiosInstance, id: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/reservations/${id}`);
  return response.data;
};
