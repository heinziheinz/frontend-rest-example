import FormAGB from 'components/footer/forms-for-data-storage/form-agb';
import HOCFooterStoreFetchAGB from 'components/footer/HOC-footer-store-fetch-agb';
const FormAGBInsertHOCasChild = () => {

    return (
        <FormAGB>
            <HOCFooterStoreFetchAGB />
            {/* <div>Hallo</div> */}
        </FormAGB>
    );
}
export default FormAGBInsertHOCasChild;