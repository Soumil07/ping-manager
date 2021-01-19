import { Argument, ArgumentContext, ArgumentResult } from '@sapphire/framework';
import { Duration, DurationFormatter } from '@sapphire/time-utilities';

const formatter = new DurationFormatter();

export default class extends Argument<number> {

	public run(argument: string, context: ArgumentContext): ArgumentResult<number> {
		const { offset } = new Duration(argument);

		if (typeof context.minimum === 'number' && offset < context.minimum) {
			return this.error('ArgumentDurationMinimumDuration', `The duration must be at least ${formatter.format(context.minimum)}.`);
		}
		if (typeof context.maximum === 'number' && offset > context.maximum) {
			return this.error('ArgumentDurationMaximumDuration', `The duration can be at most ${formatter.format(context.maximum)}.`);
		}

		return this.ok(offset);
	}

}