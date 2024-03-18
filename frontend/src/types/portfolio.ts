import { Client } from './client';
import { ISecurityRecord } from './security';

export interface Portfolio {
	client: Client;
	id: string;
	clientEnrollmentDate: string;
	securities: ISecurityRecord[];
}
