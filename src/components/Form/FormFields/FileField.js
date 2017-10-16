import React, { Component } from 'react';
import classnames from 'classnames';
import FieldWrapper from './FieldWrapper';
import { ActionNotification } from '../../';
import { ICONS } from '../../../config/constants';

class FileField extends Component {
	state = {
		filename: ''
	}
	onClick = (ev) => {
		if (this.fileInput) {
			this.fileInput.click();
		}
	}

	onChange = (ev) => {
		const file = ev.target.files[0];
		this.setState({ filename: file.name });
		this.props.input.onChange(file);
	}

	setRef = (el) => {
		this.fileInput = el;
	}

	render() {
		const { placeholder } = this.props;
		const { filename } = this.state;

		const input = {
			onChange: this.onChange,
			ref: this.setRef,
			multiple: false,
			accept: 'image/*',
			style: { display: 'none' },
		}

		return (
			<FieldWrapper {...this.props} onClick={this.onClick}>
				<div onClick={this.onClick} className="pointer file_wrapper">
					<div className={classnames('text_overflow', { placeholder: !filename})}>
						{filename ? filename : placeholder}
					</div>
					{!filename &&
						<ActionNotification
							text="upload"
							status="information"
							iconPath={ICONS.BLUE_CLIP}
							className="file_upload_icon"
						/>
					}
					<input
						type="file"
						className="input_file"
						{...input}
					/>
				</div>
			</FieldWrapper>
		);
	}
}

export default FileField;
