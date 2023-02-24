/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    useBlockProps,
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
} from '@wordpress/block-editor';

import {
    TextareaControl,
    ToggleControl,
    ToolbarGroup,
    ToolbarButton,
    SandBox,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { edit, image } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

    const onChangeAlignment = (newAlignment) => {
        setAttributes({
            alignment: newAlignment === undefined ? 'none' : newAlignment,
        });
    };

    const [hasScrollbar, setHasScrollbar] = useState(attributes.hasScrollbar || false);
    const [isPreview, setIsPreview] = useState(false);
    const [width, setWidth] = useState(attributes.width);
    const [height, setHeight] = useState(attributes.height);
    //const [isDisabled, setIsDisabled] = useState(true);

    return (
        <div {...useBlockProps()} className={`wp-block-p5js gutenbergp5-align-${attributes.alignment}`}>
            <BlockControls>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={onChangeAlignment}
                />
                <ToolbarGroup>
                    <ToolbarButton icon={edit} label="Edit" onClick={() => setIsPreview(false)} className={`components-tab-button ${!isPreview ? 'is-active' : ''}`} />
                    <ToolbarButton icon={image} label="Preview" onClick={() => setIsPreview(true)} className={`components-tab-button ${isPreview ? 'is-active' : ''}`} />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls key="setting">
                <div id="gutenbergp5-controls">
                    <ToggleControl
                        label={__("Show scroll bar")}
                        help={
                            hasScrollbar
                                ? __('Shows the scroll bar')
                                : __('Hides the scroll bar')
                        }
                        checked={hasScrollbar}
                        onChange={(value) => {
                            setHasScrollbar(value);
                            setAttributes({ hasScrollbar: value });
                        }}
                    />
                    <div>
                        <UnitControl
                            label={__('Width')}
                            value={width}
                            onChange={(value) => {
                                setWidth(value);
                                setAttributes({ width: value });
                            }}
                            units={[
                                { label: 'px', value: 'px' },
                                { label: '%', value: '%' },
                            ]}
                        />
                        <UnitControl
                            label={__('Height')}
                            value={height}
                            onChange={(value) => {
                                setHeight(value);
                                setAttributes({ height: value });
                            }
                            }
                            units={[
                                { label: 'px', value: 'px' },
                                { label: '%', value: '%' },
                            ]}
                        />
                    </div>
                </div>
            </InspectorControls>

            {!isPreview && (
                <TextareaControl
                    label={__("p5.js sketch")}
                    help={__("Enter your p5 sketch")}
                    value={attributes.sketch}
                    onChange={(value) => setAttributes({ sketch: value })}
                    rows="16"
                />
            )}

            {(isPreview /*|| isDisabled*/) && (
                <SandBox
                    html={
                        `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>` +
                        '<script>' + attributes.sketch + '</script>'
                    }
                    style={hasScrollbar ? "" : "overflow:hidden;"}
                    scrolling={hasScrollbar ? "yes" : "no"}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
}