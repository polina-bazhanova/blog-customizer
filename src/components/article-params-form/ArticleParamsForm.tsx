import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import { useRef, useState, FormEvent, SyntheticEvent } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	initialState?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	onApply?: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState = false,
	onOpen,
	onClose,
	onApply,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(initialState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const open = () => {
		setIsOpen(true);
		onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		onClose?.();
	};

	const toggle = () => (isOpen ? close() : open());

	const handleChange = (selected: OptionType, key: keyof ArticleStateType) => {
		setFormState((prevState) => ({
			...prevState,
			[key]: selected,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply?.(formState);
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					ref={ref}>
					<Text family='open-sans' weight={800} uppercase size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => handleChange(selected, 'fontFamilyOption')}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name=''
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected) => handleChange(selected, 'fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => handleChange(selected, 'fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => handleChange(selected, 'backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => handleChange(selected, 'contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
