import {PersonalDataInfo, PersonalFundInfo, UserData} from "../../../../../generated-model/model";

export class RegistrationUtils {
  public static showRegisterPanel(selectPersonalData: PersonalDataInfo, selectPersonalFund: PersonalFundInfo, userData?: UserData): boolean {
    if (!selectPersonalFund) {
      return false;
    }
    return (selectPersonalFund.mainInsclId === undefined || selectPersonalFund.mainInsclId == 'UCS' || selectPersonalFund.mainInsclId == 'WEL' || selectPersonalFund.mainInsclId == 'DIS')
      && (
        this.showRegisterNew(selectPersonalData, selectPersonalFund)
        || this.showRegisterBoard(selectPersonalFund)
        || this.showChangeHospital(selectPersonalFund)
        || this.showChangeSubInscl(userData, selectPersonalFund)
      );
  }

  /**
   * STATUS_DOLA: 1=บุคคลนี้ถูกจำหน่ายชื่อจากทะเบียนบ้านเนื่องจากตาย
   *              2=จำหน่าย ด้วย ท.ร.97
   *              3=เปลี่ยนสภาพ ท.ร.98
   *              5=รายการนี้ถูกจำหน่ายเนื่องจากมีชื่อซ้ำซ้อน
   *              7=จำหน่ายด้วย ท.ร.44
   *              11=บุคคลนี้แจ้งตายแล้วแต่ยังไม่ได้จำหน่ายออกจากทะเบียนบ้าน
   *              13=บุคคลนี้สละสัญชาติไทยแล้วและแจ้งตาย
   */
  // showRegisterPanel() {
  //   // return this.request().personalFund?.status != '003'
  //   //   && this.request().personalData?.statusDola?.status != '1'
  //   //   && this.request().personalData?.statusDola?.status != '2'
  //   //   && this.request().personalData?.statusDola?.status != '3'
  //   //   && this.request().personalData?.statusDola?.status != '5'
  //   //   && this.request().personalData?.statusDola?.status != '7'
  //   //   && this.request().personalData?.statusDola?.status != '11'
  //   //   && this.request().personalData?.statusDola?.status != '13'
  //   return this.showRegisterNew() || this.showRegisterBoard() || this.showChangeHospital() || this.showChangeSubInscl();
  // }

  public static showRegisterNew(selectPersonalData: PersonalDataInfo, selectPersonalFund: PersonalFundInfo): boolean {
    return ['005', '006', '007', '008'].includes(selectPersonalFund?.status) && selectPersonalData?.nation?.code === '099';
  }

  public static showRegisterBoard(selectPersonalFund: PersonalFundInfo): boolean {
    return selectPersonalFund?.status === '009';
  }

  public static showChangeHospital(selectPersonalFund: PersonalFundInfo): boolean {
    return ((selectPersonalFund?.status === '004' || selectPersonalFund?.status === '010')
        && (selectPersonalFund?.mainInsclId === 'UCS' || selectPersonalFund?.mainInsclId === 'WEL'))
      || (selectPersonalFund?.mastercup?.quota === '2')
      || (selectPersonalFund?.mainInsclId === 'DIS' && !selectPersonalFund?.status)
  }

  public static showChangeSubInscl(userData: UserData, selectPersonalFund: PersonalFundInfo): boolean {
    if (!selectPersonalFund?.mastercup) {
      return false;
    }
    if (!userData) {
      return false;
    }
    if (!(selectPersonalFund?.mastercup?.used == 'Y')) {
      return false;
    }
    let mastercup = selectPersonalFund.mastercup;
    // console.log('mastercup = ', mastercup)
    if (mastercup.quota === undefined || mastercup.quota === '1' || mastercup.quota === '3') {
      const hcode = userData.organization?.id;
      // console.log('hcode = ', hcode)
      const userTypeZoneOrProvince = !!userData?.authorities?.filter(e => e.authority === 'zone').length || !!userData?.authorities?.filter(e => e.authority === 'province').length
      return (selectPersonalFund?.status === '004' || selectPersonalFund?.status === '010')
        && (userTypeZoneOrProvince || mastercup.hospSubCode === hcode || mastercup.hospMainOpCode === hcode || mastercup.hospMainCode === hcode)
    }
    return false
  }
}
