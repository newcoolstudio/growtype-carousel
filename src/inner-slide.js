import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelBody } from '@wordpress/components';

registerBlockType('growtype/carousel-slide', {
    title: __('Slide'),
    icon: 'welcome-add-page',
    parent: ['growtype/carousel'],
    category: 'design',
    keywords: [__('slide')],

    attributes: {
        slideName: {
            type: 'string',
            default: '',
        },
    },

    edit: (props) => {
        const { attributes: { slideName }, setAttributes } = props;

        const onChangeSlideName = (value) => {
            setAttributes({ slideName: value });
        };

        return (
            <div className={props.className}>
                <InspectorControls>
                    <PanelBody title={__('Slide Settings', 'text-domain')} initialOpen={true}>
                        <TextControl
                            label={__('Slide Name', 'text-domain')}
                            value={slideName}
                            onChange={onChangeSlideName}
                            placeholder={__('Enter slide name', 'text-domain')}
                        />
                    </PanelBody>
                </InspectorControls>
                <InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
            </div>
        );
    },

    save: (props) => {
        const { attributes: { slideName } } = props;

        return (
            <div role="slidepanel" data-slide-name={slideName}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
