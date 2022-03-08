import FormKontakt from 'components/footer/forms-for-data-storage/form-kontakt';
import HOCFooterStoreFetchKontakt from 'components/footer/HOC-footer-store-fetch-kontakt';
const FormKontaktInsertHOCasChild = () => {
    return (
        <FormKontakt>
            <HOCFooterStoreFetchKontakt />
            {/* <div>Hallo</div> */}
        </FormKontakt>
    );
}
export default FormKontaktInsertHOCasChild;