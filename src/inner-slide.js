import {InnerBlocks} from '@wordpress/block-editor';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks


/**********************************************************
 * Registering Child Innerblock for the UWKC Carousel Block
 **********************************************************/
registerBlockType('growtype/carousel-slide', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Slide'), // Block title.
    icon: 'welcome-add-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    parent: ['growtype/carousel'],
    category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    keywords: [
        __('slide'),
    ],

    /**
     *
     * Edit function for Child Slide Block
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     *
     * @param {Object} props Props.
     * @returns {Mixed} JSX Component.
     */
    edit: (props) => {

        return (
            <div className={props.className}>
                <InnerBlocks
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                />
            </div>
        );
    },

    /**
     *
     * Save function for Child Slide Block
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     *
     * @param {Object} props Props.
     * @returns {Mixed} JSX Frontend HTML.
     */
    save: (props) => {

        return (
            <div role="slidepanel">
                <InnerBlocks.Content/>
            </div>
        );
    },
});
