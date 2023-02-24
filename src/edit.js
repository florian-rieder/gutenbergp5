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
    ToolbarDropdownMenu,
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

import { justifyLeft, justifyCenter, justifyRight, justifyStretch } from '@wordpress/icons'


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
    const [frameWidth, setWidth] = useState(attributes.width);
    const [frameHeight, setHeight] = useState(attributes.height);
    //const [isDisabled, setIsDisabled] = useState(true);

    const justifyIcons = {
        "left": justifyLeft,
        "center": justifyCenter,
        "right": justifyRight,
        "wide": justifyStretch
    }

    return (
        <div {...useBlockProps()}>
            {/** 
             *  Block toolbar 
             */}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon={justifyIcons[attributes.alignment]}
                        label="Alignment"
                        controls={[
                            {
                                title: "Left",
                                icon: justifyLeft,
                                onClick: () => setAttributes({ alignment: 'left' }),
                            },
                            {
                                title: 'Center',
                                icon: justifyCenter,
                                onClick: () => setAttributes({ alignment: 'center' }),
                            },
                            {
                                title: 'Right',
                                icon: justifyRight,
                                onClick: () => setAttributes({ alignment: 'right' }),
                            },
                            {
                                title: 'Wide',
                                icon: justifyStretch,
                                onClick: () => setAttributes({ alignment: 'wide' }),
                            },
                        ]}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton icon={edit} label={__("Edit")} onClick={() => setIsPreview(false)} className={`components-tab-button ${!isPreview ? 'is-active' : ''}`} />
                    <ToolbarButton icon={image} label={__("Preview")} onClick={() => setIsPreview(true)} className={`components-tab-button ${isPreview ? 'is-active' : ''}`} />
                </ToolbarGroup>
            </BlockControls>

            {/** 
             *  Inspector sidebar
             */}
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
                    <UnitControl
                        label={__('Width')}
                        value={frameWidth}
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
                        value={frameHeight}
                        onChange={(value) => {
                            setHeight(value);
                            setAttributes({ height: value });
                        }
                        }
                        units={[
                            { label: 'px', value: 'px' },
                            { label: '%', value: '%' },
                        ]}
                        help={__("By default, the frame is the size of the canvas.")}
                    />
                </div>
            </InspectorControls>


            {/** 
             *  Block in Edit mode
             */}
            {!isPreview && (
                <TextareaControl
                    label={__("p5.js sketch editor")}
                    //help={__("Enter your p5 sketch")}
                    value={attributes.sketch}
                    onChange={(value) => setAttributes({ sketch: value })}
                    rows="16"
                />
            )}

            {/** 
             *  Block in Preview mode
             */}
            {(isPreview) && (
                <div className={`wp-block-p5js gutenbergp5-align-${attributes.alignment}`}>
                    <SandBox
                        html={
                            `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>` +
                            '<script>' + attributes.sketch + '</script>'
                        }
                        style={"width:" + attributes.alignment == "wide" ? "100%" : frameWidth + "; height: " + frameHeight + ";" + hasScrollbar ? "" : "overflow:hidden;"}
                        scrolling={hasScrollbar ? "yes" : "no"}
                        width={attributes.alignment == "wide" ? "100%" : frameWidth}
                        height={frameHeight}
                    />
                </div>
            )}
        </div>
    );
}