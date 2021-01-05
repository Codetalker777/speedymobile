export const dataTranslate = (value: number): number => {
	switch (value) {
		case 1:
			return 100;
		case 2:
			return 200;
		case 3:
			return 500;
		case 4:
			return 1000;
		case 5:
			return 2000;
		case 6:
			return 3000;
		case 7:
			return 4000;
		case 8:
			return 5000;
		case 9:
			return 10000;
		case 10:
			return 15000;
		case 11:
			return 20000;
		case 12:
			return 25000;
		default:
			return 0;
	}
};

// maps slider value to min/msg value
export const minmsgTranslate = (value: number): number | string => {
	switch (value) {
		case 1:
			return 50;
		case 2:
			return 75;
		case 3:
			return 100;
		case 4:
			return 200;
		case 5:
			return 'Unlimited';
		default:
			return 0;
	}
};

export const upfrontRate = (value: number): number | string => {
	switch (value) {
		case 0:
			return 0;
		case 1:
			return 100;
		case 2:
			return 200;
		case 3:
			return 300;
		case 4:
			return 400;
		case 5:
			return 500;
		case 6:
			return 600;
		case 7:
			return 700;
		case 8:
			return 800;
		default:
			return 'Any';
	}
};

export const monthlyRate = (value: number): number | string => {
	switch (value) {
		case 0:
			return 10;
		case 1:
			return 20;
		case 2:
			return 30;
		case 3:
			return 40;
		case 4:
			return 50;
		case 5:
			return 60;
		case 6:
			return 70;
		case 7:
			return 80;
		case 8:
			return 90;
		default:
			return 'Any';
	}
};

export const dataSliderValue = (value: string): number => {
	switch (value) {
		case '100':
			return 1;
		case '200':
			return 2;
		case '500':
			return 3;
		case '1000':
			return 4;
		case '2000':
			return 5;
		case '3000':
			return 6;
		case '4000':
			return 7;
		case '5000':
			return 8;
		case '10000':
			return 9;
		case 'Unlimited':
			return 10;
		default:
			return 0;
	}
};

export const minuteMessageSliderValue = (value: string): number => {
	switch (value) {
		case '50':
			return 1;
		case '75':
			return 2;
		case '100':
			return 3;
		case '200':
			return 4;
		case 'Unlimited':
			return 5;
		default:
			return 0;
	}
};

export const monthlyRateString = (value: string): number => {
	switch (value) {
		case '10':
			return 0;
		case '20':
			return 1;
		case '30':
			return 2;
		case '40':
			return 3;
		case '50':
			return 4;
		case '60':
			return 5;
		case '70':
			return 6;
		case '80':
			return 7;
		case '90':
			return 8;
		default:
			return 9;
	}
};

export const upFrontRateString = (value: string): number => {
	switch (value) {
		case '50':
			return 0;
		case '100':
			return 1;
		case '200':
			return 2;
		case '300':
			return 3;
		case '400':
			return 4;
		case '500':
			return 5;
		case '600':
			return 6;
		case '700':
			return 7;
		case '800':
			return 8;
		default:
			return 9;
	}
};
