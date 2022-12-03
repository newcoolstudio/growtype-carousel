/**
 *
 * This is the parent block for the carousel block
 *
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';
import {InnerBlocks, InspectorAdvancedControls, InspectorControls} from '@wordpress/block-editor';
import {
    ToggleControl,
    RangeControl,
    RadioControl,
    PanelBody,
    Panel,
    SelectControl,
    TextControl
} from '@wordpress/components';
import {useEffect} from '@wordpress/element';

import {select} from '@wordpress/data';

let ALLOWED_BLOCKS = [
    'growtype/carousel-slide'
];

import {Icon, shortcode, postContent} from '@wordpress/icons';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {useBlockProps} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './inner-slide.js';
import './inner-growtype-post.js';
import './inner-growtype-gallery.js';

import {useInstanceId} from '@wordpress/compose';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
                                 attributes,
                                 setAttributes,
                                 markerIcon,
                                 clientId
                             }) {

    const props = useBlockProps();
    const instanceId = useInstanceId(Edit);
    const inputId = `blocks-shortcode-input-${instanceId}`;

    useEffect(() => {
        setAttributes({block_id: `growtype-carousel-block_${clientId}`})
    }, []);

    const appendInsertButton = () => {
        const selectedBlock = select("core/block-editor").getBlocksByClientId(clientId)[0];
        const innerCount = selectedBlock.innerBlocks.length;

        let sliderType = 'slide';
        selectedBlock.innerBlocks.map((block, index) => {
            if (block.name === 'growtype/carousel-growtype-post') {
                sliderType = 'growtype-post';
            } else if (block.name === 'growtype/carousel-growtype-gallery') {
                sliderType = 'growtype-gallery';
            }
        });

        if (sliderType === 'growtype-post' || sliderType === 'growtype-gallery') {
            return innerCount < 1 ? (<InnerBlocks.ButtonBlockAppender/>) : false;
        }

        return (<InnerBlocks.ButtonBlockAppender/>);
    }

    function updateCarouselType(value) {
        setCarouselType(value)

        setAttributes({carouselType: value});
    }

    function setCarouselType(carouselType) {
        if (carouselType === 'growtype-post') {
            ALLOWED_BLOCKS = [
                'growtype/carousel-growtype-post',
            ];
        } else if (carouselType === 'slide') {
            ALLOWED_BLOCKS = [
                'growtype/carousel-slide'
            ];
        } else if (carouselType === 'growtype-gallery') {
            ALLOWED_BLOCKS = [
                'growtype/carousel-growtype-gallery'
            ];
        }
    }

    /**
     * Set carousel type
     */
    setCarouselType(attributes.carouselType)

    return (<div {...useBlockProps()}>
        <InspectorControls>
            <Panel>
                <PanelBody
                    title={__('General Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <RangeControl
                        label="Slides To Show"
                        value={attributes.slidesToShow}
                        onChange={slidesToShow => setAttributes({slidesToShow})}
                        min={1}
                        max={10}
                    />
                    <RangeControl
                        label="Slides To Scroll"
                        value={attributes.slidesToScroll}
                        onChange={slidesToScroll => setAttributes({slidesToScroll})}
                        min={1}
                        max={10}
                    />
                    <SelectControl
                        label="Content Type"
                        help={__('Carousel content type', 'growtype-carousel')}
                        options={[
                            {
                                label: 'Slide',
                                value: 'slide',
                            },
                            {
                                label: 'Growtype Post (plugin required)',
                                value: 'growtype-post',
                            },
                            {
                                label: 'Growtype Gallery (plugin required)',
                                value: 'growtype-gallery',
                            }
                        ]}
                        value={attributes.carouselType}
                        onChange={(carouselType) => updateCarouselType(carouselType)}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Autoplay Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <legend className="blocks-base-control__label">
                        {__('Autoplay', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.autoplay ? 'Autoplay is on' : 'Autoplay is off'}
                        checked={attributes.autoplay}
                        onChange={autoplay => setAttributes({autoplay})}
                    />
                    <RangeControl
                        label="Autoplay Speed"
                        value={attributes.autoplaySpeed}
                        onChange={autoplaySpeed => setAttributes({autoplaySpeed})}
                        min={1000}
                        max={10000}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Position Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <legend className="blocks-base-control__label">
                        {__('Center mode', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.centerMode ? 'Center mode is on' : 'Center mode is off'}
                        checked={attributes.centerMode}
                        onChange={centerMode => setAttributes({centerMode})}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Direction', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.vertical ? 'Slider is vertical' : 'Slider is horizontal'}
                        checked={attributes.vertical}
                        onChange={vertical => setAttributes({vertical})}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Navigation Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <legend className="blocks-base-control__label">
                        {__('Infinite mode', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.infinite ? 'Infinite mode is on' : 'Infinite mode is off'}
                        checked={attributes.infinite}
                        onChange={infinite => setAttributes({infinite})}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Arrows', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.arrows ? 'Arrows are visible' : 'Arrows are hidden'}
                        checked={attributes.arrows}
                        onChange={arrows => setAttributes({arrows})}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Dots', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.dots ? 'Dots are visible' : 'Dots are hidden'}
                        checked={attributes.dots}
                        onChange={dots => setAttributes({dots})}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Counter', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.counter ? 'Is visible' : 'Is hidden'}
                        checked={attributes.counter}
                        onChange={counter => setAttributes({counter})}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Preview Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <legend className="blocks-base-control__label">
                        {__('Overflow initial', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.overflowInitial ? 'Overflow initial' : 'Overflow hidden'}
                        checked={attributes.overflowInitial}
                        onChange={overflowInitial => setAttributes({overflowInitial})}
                    />
                </PanelBody>
                <PanelBody
                    title={__('Responsive Settings', 'growtype-carousel')}
                    icon="admin-plugins"
                >
                    <legend className="blocks-base-control__label" style={{
                        margin: 0,
                        padding: 0,
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        {__('Tablet', 'growtype-carousel')}
                    </legend>
                    <TextControl
                        label={__('Tablet Width (px)', 'growtype-carousel')}
                        value={attributes.responsiveTabletWidth}
                        onChange={responsiveTabletWidth => setAttributes({responsiveTabletWidth})}
                    />
                    <RangeControl
                        label="Tablet Slides To Show"
                        value={attributes.responsiveTabletSlidesToShow}
                        onChange={responsiveTabletSlidesToShow => setAttributes({responsiveTabletSlidesToShow})}
                        min={1}
                        max={10}
                    />
                    <RangeControl
                        label="Tablet Slides To Scroll"
                        value={attributes.responsiveTabletSlidesToScroll}
                        onChange={responsiveTabletSlidesToScroll => setAttributes({responsiveTabletSlidesToScroll})}
                        min={1}
                        max={10}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Center Mode', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.responsiveTabletCenterMode ? 'Is active' : 'Is pasive'}
                        checked={attributes.responsiveTabletCenterMode}
                        onChange={responsiveTabletCenterMode => setAttributes({responsiveTabletCenterMode})}
                    />
                    <legend className="blocks-base-control__label" style={{
                        margin: 0,
                        padding: 0,
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        {__('Mobile', 'growtype-carousel')}
                    </legend>
                    <TextControl
                        label={__('Mobile Width (px)', 'growtype-carousel')}
                        value={attributes.responsiveMobileWidth}
                        onChange={responsiveMobileWidth => setAttributes({responsiveMobileWidth})}
                    />
                    <RangeControl
                        label="Mobile Slides To Show"
                        value={attributes.responsiveMobileSlidesToShow}
                        onChange={responsiveMobileSlidesToShow => setAttributes({responsiveMobileSlidesToShow})}
                        min={1}
                        max={10}
                    />
                    <RangeControl
                        label="Mobile Slides To Scroll"
                        value={attributes.responsiveMobileSlidesToScroll}
                        onChange={responsiveMobileSlidesToScroll => setAttributes({responsiveMobileSlidesToScroll})}
                        min={1}
                        max={10}
                    />
                    <legend className="blocks-base-control__label">
                        {__('Center Mode', 'growtype-carousel')}
                    </legend>
                    <ToggleControl
                        label={attributes.responsiveMobileCenterMode ? 'Is active' : 'Is pasive'}
                        checked={attributes.responsiveMobileCenterMode}
                        onChange={responsiveMobileCenterMode => setAttributes({responsiveMobileCenterMode})}
                    />
                </PanelBody>
            </Panel>
        </InspectorControls>

        <InspectorAdvancedControls>
            <TextControl
                label={__('Carousel ID', 'growtype-carousel')}
                value={attributes.sliderId}
                onChange={val => setAttributes({val})}
            />
        </InspectorAdvancedControls>

        <div {...useBlockProps({className: 'components-placeholder'})}>
            <label
                htmlFor={inputId}
                className="components-placeholder__label"
            >
                <Icon icon={postContent}/>
                {__('Growtype Carousel')}
            </label>
            <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                renderAppender={() => {
                    return appendInsertButton();
                }}
            />
        </div>
    </div>);
}
