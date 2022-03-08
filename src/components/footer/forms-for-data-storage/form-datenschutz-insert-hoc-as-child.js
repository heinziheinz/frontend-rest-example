import FormDatenschutz from 'components/footer/forms-for-data-storage/form-datenschutz';
import HOCFooterStoreFetchDatenschutz from 'components/footer/HOC-footer-store-fetch-datenschutz';
const FormDatenschutzInsertHOCasChild = () => {
    return (
        <FormDatenschutz>
            <HOCFooterStoreFetchDatenschutz />
            {/* <div>Hallo</div> */}
        </FormDatenschutz>
    );
}
export default FormDatenschutzInsertHOCasChild;