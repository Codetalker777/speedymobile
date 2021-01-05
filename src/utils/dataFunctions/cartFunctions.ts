import { CartType } from '../dataTypes';

export const deleteCart = (slug: string, cart: CartType): CartType => {
	const newCart: CartType = JSON.parse(JSON.stringify(cart));
	if (newCart.phones[slug]) {
		delete newCart.phones[slug];
	} else {
		delete newCart.plans[slug];
	}
	return newCart;
};

export const updateCart = (id: string, quantity: number, cart: CartType): CartType => {
	const newCart: CartType = JSON.parse(JSON.stringify(cart));
	if (newCart.plans[id]) {
		newCart.plans[id].quantity = quantity;
	} else {
		newCart.phones[id].quantity = quantity;
	}
	return newCart;
};

interface SharedValues {
	slug: string;
}

export const deletePlan = <T extends SharedValues>(slug: string, plans: T[]): T[] => {
	const newPlan: T[] = JSON.parse(JSON.stringify(plans));
	for (let i = 0; i < newPlan?.length; i++) {
		if (newPlan[i].slug === slug) {
			newPlan.splice(i, 1);
			break;
		}
	}
	return newPlan;
};
