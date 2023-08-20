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
    BlockControls,
    InspectorControls,
} from '@wordpress/block-editor';

import {
    TextareaControl,
    ToggleControl,
    ToolbarGroup,
    ToolbarButton,
    SandBox,
    Placeholder,
    ToolbarDropdownMenu,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import {
    edit,
    image,
    justifyLeft,
    justifyCenter,
    justifyRight,
    justifyStretch
} from '@wordpress/icons'


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
    const [hasScrollbar, setHasScrollbar] = useState(attributes.hasScrollbar || false);
    const [isPreview, setIsPreview] = useState(attributes.isPreview || false);
    const [frameWidth, setWidth] = useState(attributes.width);
    const [frameHeight, setHeight] = useState(attributes.height);
    const [alignmentState, setAlignment] = useState(attributes.alignment)
    const justifyIcons = {
        "left": justifyLeft,
        "center": justifyCenter,
        "right": justifyRight,
        "wide": justifyStretch,
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
                        label={__("Alignment")}
                        controls={[
                            {
                                title: __('Left'),
                                icon: justifyLeft,
                                onClick: () => {
                                    setAttributes({ alignment: 'left' });
                                    setAlignment('left');
                                },
                            },
                            {
                                title: __('Center'),
                                icon: justifyCenter,
                                onClick: () => {
                                    setAttributes({ alignment: 'center' });
                                    setAlignment('center');
                                },
                            },
                            {
                                title: __('Right'),
                                icon: justifyRight,
                                onClick: () => {
                                    setAttributes({ alignment: 'right' });
                                    setAlignment('right');
                                },
                            },
                            {
                                title: __('Full width'),
                                icon: justifyStretch,
                                onClick: () => {
                                    setAttributes({ alignment: 'wide' });
                                    setAlignment('wide');
                                },
                            },
                        ]}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton icon={edit} label={__("Edit")} onClick={() => {
                        setIsPreview(false);
                        setAttributes({ isPreview: false });
                    }} className={`components-tab-button ${!isPreview ? 'is-active' : ''}`} />
                    <ToolbarButton icon={image} label={__("Preview")} onClick={() => {
                        setIsPreview(true);
                        setAttributes({ isPreview: true });
                    }} className={`components-tab-button ${isPreview ? 'is-active' : ''}`} />
                </ToolbarGroup>
            </BlockControls>

            {/** 
             *  Inspector sidebar
             */}
            <InspectorControls key="setting">
                <div id="gutenbergp5-controls">
                    {/* 
                        TODO: add the option to choose to include p5.sounds.js
                              add the option to set the title of the iframe
                    */}
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
                            { label: 'vw', value: 'vw' },
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
                            { label: 'vh', value: 'vh' },
                        ]}
                        help={__("By default, the frame is the size of the canvas.")}
                    />
                </div>
            </InspectorControls>

            {/** 
             *  Block in Edit mode
             */}
            {!isPreview && (
                <Placeholder>
                    <TextareaControl
                        label={__("p5.js Sketch Editor")}
                        help={__("Enter your p5.js code in this field.")}
                        value={attributes.sketch}
                        onChange={(value) => setAttributes({ sketch: value })}
                        rows="16"
                    />
                </Placeholder>
            )}

            {/** 
             *  Block in Preview mode
             */}
            {(isPreview) && (
                <Placeholder>
                    <SandBox
                        html={
                            `<script src="` + window._p5ScriptUrl + `"></script>` +
                            '<script>' + attributes.sketch + '</script>'
                        }
                    />
                </Placeholder>
            )}
        </div>
    );
}
