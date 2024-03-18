export interface ISecurityCategoryRecord {
	security_type: string;
	total_value: number;
}

export interface ISecurityRecord {
	name: string;
	category: string;
	purchasePrice: number;
	purchaseDate: Date;
	quantity: number;
}
