import FormDatenschutz from 'components/footer/forms-for-data-storage/form-datenschutz';
import HOCFooterStoreFetchDatenschutzUpdate from 'components/footer/HOC-footer-update-fetch-datenschutz';
const FormDatenschutzInsertHOCasChildUpdate = () => {
    return (
        <FormDatenschutz>
            <HOCFooterStoreFetchDatenschutzUpdate />
            {/* <div>Hallo</div> */}
        </FormDatenschutz>
    );
}
export default FormDatenschutzInsertHOCasChildUpdate;